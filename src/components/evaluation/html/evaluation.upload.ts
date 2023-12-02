import { EvaluationNameConstants } from 'src/core/prompts';
const values = [
  EvaluationNameConstants.IsInputAPitch,
  EvaluationNameConstants.LetterGradeFeaturesBenefits,
  EvaluationNameConstants.EvaluationFeaturesBenefits,
  EvaluationNameConstants.RecommendationsFeaturesBenefits,
  EvaluationNameConstants.LetterGradeReadiness,
  EvaluationNameConstants.EvaluationReadiness,
  EvaluationNameConstants.RecommendationsReadiness,
  EvaluationNameConstants.LetterBTE,
  EvaluationNameConstants.EvaluationBTE,
  EvaluationNameConstants.RecommendationsBTE,
  EvaluationNameConstants.LetterAdoption,
  EvaluationNameConstants.EvaluationAdoption,
  EvaluationNameConstants.RecommendationsAdoption,
  EvaluationNameConstants.LetterSupplyChain,
  EvaluationNameConstants.EvaluationSupplyChain,
  EvaluationNameConstants.RecommendationsSupplyChain,
  EvaluationNameConstants.LetterMarketSize,
  EvaluationNameConstants.EvaluationMarketSize,
  EvaluationNameConstants.RecommendationsMarketSize,
  EvaluationNameConstants.LetterEE,
  EvaluationNameConstants.EvaluationEE,
  EvaluationNameConstants.RecommendationsEE,
  EvaluationNameConstants.LetterFE,
  EvaluationNameConstants.EvaluationFE,
  EvaluationNameConstants.RecommendationsFE,
];
function estimateRows(text, maxCharsPerRow = 80) {
  // Count the number of newline characters
  const newlineCount = (text.match(/\n/g) || []).length;

  // Estimate the number of rows from wrapping
  let wrapCount = 0;
  const lines = text.split('\n');
  for (const line of lines) {
    wrapCount += Math.ceil(line.length / maxCharsPerRow);
  }

  return newlineCount + wrapCount;
}

export const evaluationHTML = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Client and Salesperson Information</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 50px;
    }

    form {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 800px; /* Increased the width */
        margin: 0 auto;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
    }

    textarea, input[type="url"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical; /* Allow vertical resizing */
    }

    input[type="submit"] {
        background-color: #007BFF;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    input[type="submit"]:hover {
        background-color: #0056b3;
    }
</style>
</head>
<body>
    <form action="/openai/create-message" method="post">
    <label for="phone">IsInputAPitch:</label>
    <textarea type="text" id="IsInputAPitch" name="IsInputAPitch" rows="${estimateRows(
      EvaluationNameConstants.IsInputAPitch,
    )}" required>
    ${EvaluationNameConstants.IsInputAPitch}
    </textarea>
    <textarea type="text" id="LetterGradeFeaturesBenefits" name="LetterGradeFeaturesBenefits" rows="${estimateRows(
      EvaluationNameConstants.LetterGradeFeaturesBenefits,
    )}" required>
${EvaluationNameConstants.LetterGradeFeaturesBenefits}
</textarea>

<textarea type="text" id="EvaluationFeaturesBenefits" name="EvaluationFeaturesBenefits" rows="${estimateRows(
  EvaluationNameConstants.EvaluationFeaturesBenefits,
)}" required>
${EvaluationNameConstants.EvaluationFeaturesBenefits}
</textarea>

<textarea type="text" id="RecommendationsFeaturesBenefits" name="RecommendationsFeaturesBenefits" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsFeaturesBenefits,
)}" required>
${EvaluationNameConstants.RecommendationsFeaturesBenefits}
</textarea>

<textarea type="text" id="LetterGradeReadiness" name="LetterGradeReadiness" rows="${estimateRows(
  EvaluationNameConstants.LetterGradeReadiness,
)}" required>
${EvaluationNameConstants.LetterGradeReadiness}
</textarea>

<textarea type="text" id="EvaluationReadiness" name="EvaluationReadiness" rows="${estimateRows(
  EvaluationNameConstants.EvaluationReadiness,
)}" required>
${EvaluationNameConstants.EvaluationReadiness}
</textarea>

<textarea type="text" id="RecommendationsReadiness" name="RecommendationsReadiness" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsReadiness,
)}" required>
${EvaluationNameConstants.RecommendationsReadiness}
</textarea>

<textarea type="text" id="LetterBTE" name="LetterBTE" rows="${estimateRows(
  EvaluationNameConstants.LetterBTE,
)}" required>
${EvaluationNameConstants.LetterBTE}
</textarea>

<textarea type="text" id="EvaluationBTE" name="EvaluationBTE" rows="${estimateRows(
  EvaluationNameConstants.EvaluationBTE,
)}" required>
${EvaluationNameConstants.EvaluationBTE}
</textarea>

<textarea type="text" id="RecommendationsBTE" name="RecommendationsBTE" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsBTE,
)}" required>
${EvaluationNameConstants.RecommendationsBTE}
</textarea>

<textarea type="text" id="LetterAdoption" name="LetterAdoption" rows="${estimateRows(
  EvaluationNameConstants.LetterAdoption,
)}" required>
${EvaluationNameConstants.LetterAdoption}
</textarea>

<textarea type="text" id="EvaluationAdoption" name="EvaluationAdoption" rows="${estimateRows(
  EvaluationNameConstants.EvaluationAdoption,
)}" required>
${EvaluationNameConstants.EvaluationAdoption}
</textarea>

<textarea type="text" id="RecommendationsAdoption" name="RecommendationsAdoption" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsAdoption,
)}" required>
${EvaluationNameConstants.RecommendationsAdoption}
</textarea>

<textarea type="text" id="LetterSupplyChain" name="LetterSupplyChain" rows="${estimateRows(
  EvaluationNameConstants.LetterSupplyChain,
)}" required>
${EvaluationNameConstants.LetterSupplyChain}
</textarea>

<textarea type="text" id="EvaluationSupplyChain" name="EvaluationSupplyChain" rows="${estimateRows(
  EvaluationNameConstants.EvaluationSupplyChain,
)}" required>
${EvaluationNameConstants.EvaluationSupplyChain}
</textarea>

<textarea type="text" id="RecommendationsSupplyChain" name="RecommendationsSupplyChain" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsSupplyChain,
)}" required>
${EvaluationNameConstants.RecommendationsSupplyChain}
</textarea>

<textarea type="text" id="LetterMarketSize" name="LetterMarketSize" rows="${estimateRows(
  EvaluationNameConstants.LetterMarketSize,
)}" required>
${EvaluationNameConstants.LetterMarketSize}
</textarea>

<textarea type="text" id="EvaluationMarketSize" name="EvaluationMarketSize" rows="${estimateRows(
  EvaluationNameConstants.EvaluationMarketSize,
)}" required>
${EvaluationNameConstants.EvaluationMarketSize}
</textarea>

<textarea type="text" id="RecommendationsMarketSize" name="RecommendationsMarketSize" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsMarketSize,
)}" required>
${EvaluationNameConstants.RecommendationsMarketSize}
</textarea>

<textarea type="text" id="LetterEE" name="LetterEE" rows="${estimateRows(
  EvaluationNameConstants.LetterEE,
)}" required>
${EvaluationNameConstants.LetterEE}
</textarea>

<textarea type="text" id="EvaluationEE" name="EvaluationEE" rows="${estimateRows(
  EvaluationNameConstants.EvaluationEE,
)}" required>
${EvaluationNameConstants.EvaluationEE}
</textarea>

<textarea type="text" id="RecommendationsEE" name="RecommendationsEE" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsEE,
)}" required>
${EvaluationNameConstants.RecommendationsEE}
</textarea>

<textarea type="text" id="LetterFE" name="LetterFE" rows="${estimateRows(
  EvaluationNameConstants.LetterFE,
)}" required>
${EvaluationNameConstants.LetterFE}
</textarea>

<textarea type="text" id="EvaluationFE" name="EvaluationFE" rows="${estimateRows(
  EvaluationNameConstants.EvaluationFE,
)}" required>
${EvaluationNameConstants.EvaluationFE}
</textarea>

<textarea type="text" id="RecommendationsFE" name="RecommendationsFE" rows="${estimateRows(
  EvaluationNameConstants.RecommendationsFE,
)}" required>
${EvaluationNameConstants.RecommendationsFE}
</textarea>
    <br><br>
    
    
        <input type="submit" value="Submit">
    </form>
</body>`;
