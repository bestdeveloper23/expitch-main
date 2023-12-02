/* eslint-disable prettier/prettier */
import { EvaluationName } from './constants';

export const EvaluationNameConstants = {
  [EvaluationName.IsInputAPitch]: `Evaluate this text and determine if the provided text is a startup pitch based on the factors like Introduction and Elevator Pitch, Problem Statement, Solution, Market Opportunity, Business Model, Target Audience and Customer Segments, Competitive Advantage, Financials and Funding.
If it is a pitch, return true, otherwise false.`,
  [EvaluationName.LetterGradeFeaturesBenefits]: `Evaluate the Features & Benefits aspect of the startup's offering and assign an appropriate letter from the grade scale based on the following criteria:
Does the proposed product or service offer performance advantages compared to currently deployed solutions?
Are there substantial advantages, measurable benefits, or competitive performance at a competitive cost?
Can the solution effectively meet customer demands and expectations?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.`,
  [EvaluationName.EvaluationFeaturesBenefits]: `Given the provided pitch, Evaluate the Features & Benefits aspect of the startup's offering and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
Any significant advantages or innovative features compared to existing solutions.
The extent to which the benefits are measurable, unique, or cater to specific market niches.
How well the solution addresses customer demands and expectations.`,
  [EvaluationName.RecommendationsFeaturesBenefits]: `Based on the evaluation of the Features & Benefits, provide recommendations and suggestions on how the startup can further improve their offering. Consider the following aspects:
Areas where the solution can be enhanced to provide stronger performance advantages or unique benefits.
Suggestions for better aligning the product or service with customer demands and expectations.
Ideas for differentiation, innovation, or addressing specific market niches.`,
  [EvaluationName.LetterGradeReadiness]: `Given the provided pitch, evaluate the Readiness aspect of the startup's product or service and assign an appropriate letter from the grade scale based on the following criteria:
How far away is the startup from being able to deliver completed products or services to their first revenue customer?
Have all necessary product development milestones been achieved, including addressing technology development, manufacturing, and supply chain issues?
Are there any sales or beta tests conducted to validate the readiness of the offering?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.`,
  [EvaluationName.EvaluationReadiness]: `Given the provided pitch, Evaluate the Readiness aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The progress made in product development, addressing technology challenges, and achieving desired performance.
The readiness of the supply chain, including manufacturing capabilities and any associated risks.
Any sales or beta test results that demonstrate the startup's readiness to deliver the offering to customers.
`,
  [EvaluationName.RecommendationsReadiness]: `Based on the evaluation of the Readiness aspect, provide recommendations and suggestions on how the startup can further improve their readiness to deliver their product or service. Consider the following aspects:
Areas where additional work is needed to address technology, manufacturing, or supply chain challenges.
Strategies for accelerating the readiness timeline and reducing development risks.
Suggestions for conducting effective beta tests or sales efforts to validate and improve the product/service offering.
Please provide detailed and insightful feedback in the evaluation and recommendations to help the startup understand the strengths and areas of improvement for their Readiness aspect.
`,
  [EvaluationName.LetterBTE]: `Based on the information provided in the pitch, evaluate the Barrier To Entry aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:
What is unique or patentable about the product/service that represents a barrier to entry for potential competitors?
Does the product/service have any patents or proprietary technology that is not easily replicable?
Are there unique features or brand elements that create a significant barrier to competitors?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.
`,
  [EvaluationName.EvaluationBTE]: `Given the provided pitch, Evaluate the Barrier To Entry aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The presence of patents, proprietary technology, or unique knowledge that sets the product/service apart from competitors.
The level of difficulty for potential competitors to replicate key features or aspects of the offering.
Any other mechanisms or strategies employed to create a sustainable competitive advantage and deter new entrants.
`,
  [EvaluationName.RecommendationsBTE]: `Based on the evaluation of the Barrier To Entry aspect, provide recommendations and suggestions on how the startup can further strengthen and enhance their barriers to entry. Consider the following aspects:
Exploring additional intellectual property (IP) tools such as copyrights or trademarks to protect unique elements.
Identifying strategic partnerships or licensing opportunities to leverage existing brands or technologies.
Investigating ways to achieve economies of scale, develop customer loyalty, or establish partnerships that make market entry less attractive to competitors.
Please provide specific and actionable recommendations to help the startup maximize their competitive advantage and establish strong barriers to entry in their target market.
`,
  [EvaluationName.LetterAdoption]: `Evaluate the Adoption aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:
Can the startup demonstrate that customers in their target market will purchase the product or service when it becomes available?
Have customers been involved in the development process and committed to purchasing or trying the product/service upon availability?
Is there independent market validation or evidence of customer interest in the product/service?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.`,
  [EvaluationName.EvaluationAdoption]: `Given the provided pitch, Evaluate the Adoption aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The level of customer involvement in the development process and their commitment to purchasing or trying the product/service.
Market research or validation confirming the existence of a specific market for the product or service.
Any lack of independent market validation or customer commitments to test or purchase the offering.`,
  [EvaluationName.RecommendationsAdoption]: `Based on the evaluation of the Adoption aspect, provide recommendations and suggestions on how the startup can further demonstrate customer adoption and strengthen their market position. Consider the following aspects:
Encouraging deeper customer involvement in the development process and leveraging their feedback to refine the product/service.
Conducting third-party market validation studies to gather objective data on customer demand and preferences.
Connecting with industry experts or associations to gain valuable insights and endorsements from key stakeholders.
Please provide specific and actionable recommendations to help the startup increase customer adoption and establish a strong market presence.`,
  [EvaluationName.LetterSupplyChain]: `Evaluate the Supply Chain aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:
Can the startup provide confirmation that there are no success barriers regarding their supply chain or distribution channel?
Have suppliers and channel partners been engaged in the development process, with firm commitments to participate upon market readiness?
Are there identified possible channel and supply chain partners, even if formal agreements are not yet in place?
Has the startup approached distribution or supply chain partners at this stage?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.`,
  [EvaluationName.EvaluationSupplyChain]: `Given the provided pitch, Evaluate the Supply Chain aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The level of engagement and commitment from suppliers and channel partners in the development process.
Identification and initial discussions held with possible channel and supply chain partners.
The absence or presence of formal agreements with distribution or supply chain partners.
Any potential success barriers or challenges related to the supply chain or distribution channel.`,
  [EvaluationName.RecommendationsSupplyChain]: `Based on the evaluation of the Supply Chain aspect, provide recommendations and suggestions on how the startup can enhance their supply chain management and strengthen their distribution channel. Consider the following aspects:
Demonstrating a good understanding of supply chain requirements and the ability to negotiate with partners.
Developing strong relationships with suppliers, ensuring access to critical raw materials or reliable manufacturing facilities.
Identifying and engaging infrastructure partners or distribution channels that can support the startup's product or service.
Creating a realistic plan to drive traffic to retail locations and foster promotion efforts.
Showing the startup's importance to distribution partners and their willingness to promote the product/service.
Please provide specific and actionable recommendations to help the startup optimize their supply chain and distribution channel, ensuring a smooth and efficient flow from production to the market.`,
  [EvaluationName.LetterMarketSize]: `Evaluate the Market Size aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:
Is there direct evidence that the market potential for the product or service is large, and the startup can achieve enough market share to meet the sales target?
Is there some evidence indicating a relatively large market potential and the ability to obtain sufficient market share for the sales target?
Is there no direct evidence supporting the overall market size or validating the expected market share, making revenue forecasting challenging?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  `,
  [EvaluationName.EvaluationMarketSize]: `Given the provided pitch, Evaluate the Market Size aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The presence of direct evidence or indications supporting the overall market potential and expected market share.
The feasibility of generating the envisaged revenues based on the overall market size and the startup's market share.
The level of interest and attractiveness of the overall market forecast for the product or service.
Any challenges or uncertainties related to market size estimation and revenue projections.`,
  [EvaluationName.RecommendationsMarketSize]: `Based on the evaluation of the Market Size aspect, provide recommendations and suggestions on how the startup can enhance their understanding of market size, refine revenue projections, and develop strategies to capture a significant market share. Consider the following aspects:
Breaking down the market into segments and identifying the specific sector the startup is targeting.
Conducting thorough market research and validation studies to gather accurate data on potential customers, their willingness to pay, and market dynamics.
Identifying successful similar businesses or products/services to gain insights and leverage their market size as a reference point.
Developing a focused marketing strategy to attract and capture a reasonable market share.
Seeking third-party validation and expert opinions to confirm assumptions and enhance confidence in market size estimations.
Provide specific and actionable recommendations to help the startup demonstrate a solid understanding of the market size, potential customer base, and revenue opportunities, thereby strengthening their overall business strategy.`,
  [EvaluationName.LetterEE]: `Evaluate the Entrepreneur Experience aspect of the startup's management team and assign an appropriate letter from the grade scale considering the following criteria:
Does the management team possess deep and significant relevant experience that will enable them to successfully operate the business?
Does the management team have significant business or equivalent experience that, although not directly relevant, can contribute to operating the business?
Does the experience of the management team primarily lie in technical areas or is it limited, providing no direct evidence of their ability to handle the challenges of running the business?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  `,
  [EvaluationName.EvaluationEE]: `Given the provided pitch, Evaluate the Entrepreneur Experience aspect of the startup's management team and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The depth and relevance of experience possessed by the management team members in areas such as entrepreneurship, industry, and business.
The track record and prior successes/failures that demonstrate the management team's ability to navigate challenges.
Any additional skills, education, or relevant expertise that contribute to their capability to run the business effectively.
The potential for the management team to address gaps in their experience by recruiting complementary team members or seeking advisory/mentorship support.`,
  [EvaluationName.RecommendationsEE]: `Based on the evaluation of the Entrepreneur Experience aspect, provide recommendations and suggestions on how the startup's management team can enhance their experience, skills, and capabilities to successfully overcome the challenges of operating the business. Consider the following aspects:
Identifying ways to demonstrate relevant experiences or alternative forms of education that are applicable to the business.
Seeking out advisors or mentors with the appropriate skills and experience who can guide and support the management team.
Exploring opportunities for team expansion to include individuals with complementary expertise to address any gaps in experience.
Building a network of industry professionals or joining relevant entrepreneurial communities to gain insights and access valuable resources.
Offer specific and actionable recommendations to help the startup's management team enhance their entrepreneur experience, strengthen their capabilities, and position themselves favorably for investment and effective business management.`,
  [EvaluationName.LetterFE]: `Evaluate the Financial Expectations of the business and assign an appropriate letter from the grade scale based on the following criteria:
Does the financial projection demonstrate a high degree of confidence in achieving cash-flow neutrality within a specific timeframe?
Is there a reasonable degree of confidence in achieving cash-flow neutrality within a specific timeframe, either directly or by raising additional cash?
Does the financial projection lack the necessary level of detail or show a negative cash flow position over a specific timeframe, with limited confidence in raising additional cash?
Grade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  `,
  [EvaluationName.EvaluationFE]: `Given the provided pitch, Evaluate the Financial Expectations of the business and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:
The realism and viability of the financial projections in terms of achieving cash-flow neutrality within the specified timeframe.
The degree of confidence in revenue forecasts, profit margins, and external funding sources identified to support cash-flow neutrality.
The ability of the financial projections to demonstrate a clear path to profitability and long-term viability of the business.
The inclusion of cash flow calculations, considering cash from operations, investments, and other potential sources of cash.
The consideration of different sources of cash to address potential cash flow shortfalls and reduce reliance on equity financing.
The alignment of subsequent rounds of funding with specific milestones and increased company valuation.
Provide a detailed and well-supported evaluation of the financial projections, highlighting strengths and potential areas of improvement in achieving cash-flow neutrality and long-term financial stability.`,
  [EvaluationName.RecommendationsFE]: `Based on the evaluation of the Financial Expectations, provide recommendations and suggestions to enhance the financial projections and increase confidence in achieving cash-flow neutrality. Consider the following aspects:
Conducting iterations and sensitivity analysis to refine the financial projections and assess the impact of various scenarios, such as reduced margins, sales delays, or increased development costs.
Incorporating contingency plans and mitigating strategies to address potential business risks, including technological, market, operational, or financial risks.
Ensuring that the financial projections focus on significant numbers and avoid unnecessary details that can distract from the key financial indicators.
Considering different sources of cash and building contingency plans to address cash flow shortfalls or delays in funding.
Seeking feedback and guidance from financial advisors or mentors with expertise in financial forecasting and cash flow management.
Provide specific and actionable recommendations to strengthen the financial projections, improve cash-flow management, and increase the overall financial viability of the business.`,
} as const;

export const demoPitch1 = `Thank you for giving me the opportunity to present 'EcoSmart Solutions.' Our company is at the forefront of the smart home automation industry, but we are not just another tech start-up. We are on a mission to combat climate change and create a better future for our planet by promoting sustainable living through cutting-edge technology.
The world is facing an unprecedented environmental crisis. Greenhouse gas emissions, wasteful energy consumption, and the depletion of natural resources are putting our planet at risk. Homeowners are increasingly concerned about their carbon footprints, but most of them lack the knowledge and tools to make meaningful changes. This is where 'EcoSmart Solutions' steps in.
'EcoSmart Solutions' offers a comprehensive package that combines the power of home automation and sustainable practices to transform any dwelling into an environmentally conscious, energy-efficient, and comfortable abode.
Our smart home system integrates with various devices, including lighting, heating, cooling, and appliances, to optimize energy consumption. Through advanced AI algorithms, the system learns from homeowners' habits and preferences, adjusting energy usage accordingly. This results in substantial energy savings and lower utility bills.
'EcoSmart Solutions' emphasizes the integration of renewable energy sources, such as solar panels and wind turbines, to power homes sustainably. Our smart grid technology allows homeowners to sell excess energy back to the grid, creating a greener, more self-sufficient community.
Water scarcity is a growing concern worldwide. Our system includes smart water management features that monitor usage, detect leaks, and provide recommendations for conservation, ensuring responsible water consumption.
Reducing waste is a vital part of sustainability. 'EcoSmart Solutions' encourages recycling and composting through smart waste management. We provide real-time tracking of waste output and offer insights to minimize environmental impact.
Indoor air quality can significantly impact health and well-being. Our smart sensors monitor air quality and ventilation, enabling homeowners to maintain a healthier living environment.
We collaborate with architects and construction companies to promote eco-friendly building materials and energy-efficient home designs, creating green homes from the ground up.
The smart home automation market is booming, with an increasing number of homeowners investing in such technologies. Coupled with the growing concern for the environment, 'EcoSmart Solutions' is well-positioned to tap into this demand and establish a strong presence in the market.
Our unique selling proposition lies in our deep commitment to sustainability. While there are other smart home companies out there, none put such a strong emphasis on integrating sustainable practices into every aspect of daily living. By combining cutting-edge technology with environmental responsibility, we offer homeowners a clear conscience and long-term savings on utility costs.
'EcoSmart Solutions' generates revenue through product sales, installation and maintenance services, subscription-based cloud services for data analysis, and strategic partnerships with green energy providers.
As an investor, you have the chance to not only support a potentially lucrative business venture but also contribute to the well-being of our planet. With 'EcoSmart Solutions,' we can create a world where sustainable living is the norm, and homes become catalysts for positive environmental change. Together, let's revolutionize the way we live, one smart home at a time. Thank you.
`;

export const demoPitch2 = `Ladies and gentlemen, as a savvy startup investor, I present to you an exciting opportunity in the rapidly growing e-commerce industry—a revolutionary footwear-focused online marketplace poised to disrupt the way people shop for shoes. Allow me to introduce you to 'StepUp: Your Ultimate Footwear Haven.'
Footwear is a massive global market, with an estimated worth of over $200 billion and projected to grow at a steady rate. 'StepUp' aims to capitalize on this growing trend by offering an unmatched selection of high-quality footwear for every occasion, age group, and style preference. From athletic sneakers to elegant dress shoes and everything in between, we have it all!
What sets 'StepUp' apart from the competition is our cutting-edge technology and personalized shopping experience. Our platform incorporates advanced AI algorithms to analyze customers' preferences, style, and size to provide tailored product recommendations. Gone are the days of endless scrolling and disappointment—our customers will find their perfect fit with just a few clicks.
Furthermore, 'StepUp' is committed to sustainability. We've partnered with eco-conscious footwear brands to offer a curated selection of environmentally friendly options. This will attract a growing segment of conscious consumers who value both style and ethical shopping.
Our revenue model is straightforward—earning from every sale made on our platform, with additional income streams from sponsored placements and targeted advertising. By maintaining a strong focus on customer satisfaction, we aim to generate repeat business and foster brand loyalty.
In terms of growth, we have a well-defined roadmap. Our initial target market will be our home country, where we'll leverage social media marketing, influencer collaborations, and strategic partnerships with fashion bloggers to create a buzz around our brand. Once we've established a solid foundation, we'll expand to key international markets, starting with neighboring countries and gradually reaching a global audience.
In conclusion, 'StepUp' is more than just an e-commerce website for footwear—it's a game-changer. With a vast market potential, a unique value proposition, and a well-crafted business model, we believe 'StepUp' has what it takes to make a lasting impact in the industry.
As an investor, your support will not only fuel our growth but also be instrumental in reshaping the way people shop for shoes online. Join us on this incredible journey, and together, we'll step into a future where shoe shopping is an unparalleled, personalized experience. Thank you for your time, and we look forward to discussing how you can be a part of 'StepUp's' success.
`;
