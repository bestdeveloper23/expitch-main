import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import { EnvironmentVariables } from 'src/config/environment.schema';
import { FileUploadException } from './cloudStorage.exceptions';
import { parse, extname } from 'path';

@Injectable()
export class CloudStorageService {
  private readonly rootFolder = 'uploads';
  private readonly bucket: Bucket;
  private readonly path = {
    pitchFiles: `${this.rootFolder}/pitch_files`,
  };
  private readonly maxFileSizeInMb = {
    pitchFile: 25,
  };

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    const storage = new Storage({
      credentials: {
        client_email: this.configService.get('GCS_CLIENT_EMAIL'),
        private_key: this.configService
          .get('GCS_PRIVATE_KEY')
          .replace(/\\n/gm, '\n'),
      },
    });

    const bucketName = this.configService.get('GCS_BUCKET');
    this.bucket = storage.bucket(bucketName);
  }

  async uploadPitchFile(pitch: Express.Multer.File): Promise<any> {
    try {
      // TODO: Check the file size
      return await this.uploadMediaFile('pitchFiles', pitch);
    } catch (error) {
      console.error('Error uploading pitch file:', error);
      throw new FileUploadException;
    }
  }
  

  private async uploadMediaFile(
    mainPath: keyof typeof this.path,
    file: Express.Multer.File,
  ): Promise<{ path: string; name: string }> {
    try {
      const originalName = file.originalname;
      const parsedName = parse(originalName);
      const sanitizedBase = parsedName.name.replace(/\s/gi, '_');
      const timestamp = Date.now().toString();
      const extension = extname(originalName);
      
      const name = `${sanitizedBase}-${timestamp}${extension}`;
      const path = `${this.path[mainPath]}/${name}`;
    
      console.log('Attempting to upload to:', path);
    
      const blob = this.bucket.file(path);
      const blobStream = blob.createWriteStream();
    
      return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(file.path);
    
        readStream
          .pipe(blobStream)
          .on('finish', () => {
            console.log(`Successfully uploaded to ${path}`);
            resolve({ path, name });
          })
          .on('error', (err) => {
            console.error('Stream error:', err);
            reject(err);
          });
      });
    } catch (error) {
      console.error('Error uploading media file:', error);
      throw new FileUploadException();
    }
  }
  
}
