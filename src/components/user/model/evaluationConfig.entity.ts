// How does this actually work...?

/*
1. Evaluation and Recommendations create a system prompt like this:

Systemprompt: Evaluation.value +"\n" + "Example: " + Evaluation.example + +"\n" + Recommendations.value + "\n" + "Example: " + Recommendations.example
User Prompt: PitchText
2. This gives an evaluation + recommendations object.

3. This is now fed again into the model to get the final evaluation + recommendations object.
System Prompt: LetterGrade.value +"\n" + "Example: " + LetterGrade.example 

This is now returned.
*/
const exampleFeatureBenefits = {
  LetterGrade:
    "Evaluate the Features & Benefits aspect of the startup's offering and assign an appropriate letter from the grade scale based on the following criteria:\nDoes the proposed product or service offer performance advantages compared to currently deployed solutions?\nAre there substantial advantages, measurable benefits, or competitive performance at a competitive cost?\nCan the solution effectively meet customer demands and expectations?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.",

  Evaluation:
    "Given the provided pitch, Evaluate the Features & Benefits aspect of the startup's offering and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nAny significant advantages or innovative features compared to existing solutions.\nThe extent to which the benefits are measurable, unique, or cater to specific market niches.\nHow well the solution addresses customer demands and expectations.",

  Recommendations:
    'Based on the evaluation of the Features & Benefits, provide recommendations and suggestions on how the startup can further improve their offering. Consider the following aspects:\nAreas where the solution can be enhanced to provide stronger performance advantages or unique benefits.\nSuggestions for better aligning the product or service with customer demands and expectations.\nIdeas for differentiation, innovation, or addressing specific market niches.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleReadiness = {
  LetterGrade:
    "Given the provided pitch, evaluate the Readiness aspect of the startup's product or service and assign an appropriate letter from the grade scale based on the following criteria:\nHow far away is the startup from being able to deliver completed products or services to their first revenue customer?\nHave all necessary product development milestones been achieved, including addressing technology development, manufacturing, and supply chain issues?\nAre there any sales or beta tests conducted to validate the readiness of the offering?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.",

  Evaluation:
    "Given the provided pitch, Evaluate the Readiness aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe progress made in product development, addressing technology challenges, and achieving desired performance.\nThe readiness of the supply chain, including manufacturing capabilities and any associated risks.\nAny sales or beta test results that demonstrate the startup's readiness to deliver the offering to customers.",

  Recommendations:
    'Based on the evaluation of the Readiness aspect, provide recommendations and suggestions on how the startup can further improve their readiness to deliver their product or service. Consider the following aspects:\nAreas where additional work is needed to address technology, manufacturing, or supply chain challenges.\nStrategies for accelerating the readiness timeline and reducing development risks.\nSuggestions for conducting effective beta tests or sales efforts to validate and improve the product/service offering.\nPlease provide detailed and insightful feedback in the evaluation and recommendations to help the startup understand the strengths and areas of improvement for their Readiness aspect.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleBarrierToEntry = {
  LetterGrade:
    "Based on the information provided in the pitch, evaluate the Barrier To Entry aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:\nWhat is unique or patentable about the product/service that represents a barrier to entry for potential competitors?\nDoes the product/service have any patents or proprietary technology that is not easily replicable?\nAre there unique features or brand elements that create a significant barrier to competitors?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.",

  Evaluation:
    "Given the provided pitch, Evaluate the Barrier To Entry aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe presence of patents, proprietary technology, or unique knowledge that sets the product/service apart from competitors.\nThe level of difficulty for potential competitors to replicate key features or aspects of the offering.\nAny other mechanisms or strategies employed to create a sustainable competitive advantage and deter new entrants.",

  Recommendations:
    'Based on the evaluation of the Barrier To Entry aspect, provide recommendations and suggestions on how the startup can further strengthen and enhance their barriers to entry. Consider the following aspects:\nExploring additional intellectual property (IP) tools such as copyrights or trademarks to protect unique elements.\nIdentifying strategic partnerships or licensing opportunities to leverage existing brands or technologies.\nInvestigating ways to achieve economies of scale, develop customer loyalty, or establish partnerships that make market entry less attractive to competitors.\nPlease provide specific and actionable recommendations to help the startup maximize their competitive advantage and establish strong barriers to entry in their target market.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleAdoption = {
  LetterGrade:
    "Evaluate the Adoption aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:\nCan the startup demonstrate that customers in their target market will purchase the product or service when it becomes available?\nHave customers been involved in the development process and committed to purchasing or trying the product/service upon availability?\nIs there independent market validation or evidence of customer interest in the product/service?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.",

  Evaluation:
    "Given the provided pitch, Evaluate the Adoption aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe level of customer involvement in the development process and their commitment to purchasing or trying the product/service.\nMarket research or validation confirming the existence of a specific market for the product or service.\nAny lack of independent market validation or customer commitments to test or purchase the offering.",

  Recommendations:
    'Based on the evaluation of the Adoption aspect, provide recommendations and suggestions on how the startup can further demonstrate customer adoption and strengthen their market position. Consider the following aspects:\nEncouraging deeper customer involvement in the development process and leveraging their feedback to refine the product/service.\nConducting third-party market validation studies to gather objective data on customer demand and preferences.\nConnecting with industry experts or associations to gain valuable insights and endorsements from key stakeholders.\nPlease provide specific and actionable recommendations to help the startup increase customer adoption and establish a strong market presence.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleSupplyChain = {
  LetterGrade:
    "Evaluate the Supply Chain aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:\nCan the startup provide confirmation that there are no success barriers regarding their supply chain or distribution channel?\nHave suppliers and channel partners been engaged in the development process, with firm commitments to participate upon market readiness?\nAre there identified possible channel and supply chain partners, even if formal agreements are not yet in place?\nHas the startup approached distribution or supply chain partners at this stage?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.",

  Evaluation:
    "Given the provided pitch, Evaluate the Supply Chain aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe level of engagement and commitment from suppliers and channel partners in the development process.\nIdentification and initial discussions held with possible channel and supply chain partners.\nThe absence or presence of formal agreements with distribution or supply chain partners.\nAny potential success barriers or challenges related to the supply chain or distribution channel.",

  Recommendations:
    "Based on the evaluation of the Supply Chain aspect, provide recommendations and suggestions on how the startup can enhance their supply chain management and strengthen their distribution channel. Consider the following aspects:\nDemonstrating a good understanding of supply chain requirements and the ability to negotiate with partners.\nDeveloping strong relationships with suppliers, ensuring access to critical raw materials or reliable manufacturing facilities.\nIdentifying and engaging infrastructure partners or distribution channels that can support the startup's product or service.\nCreating a realistic plan to drive traffic to retail locations and foster promotion efforts.\nShowing the startup's importance to distribution partners and their willingness to promote the product/service.\nPlease provide specific and actionable recommendations to help the startup optimize their supply chain and distribution channel, ensuring a smooth and efficient flow from production to the market.",

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleMarketSize = {
  LetterGrade:
    "Evaluate the Market Size aspect of the startup's product or service and assign an appropriate letter from the grade scale considering the following criteria:\nIs there direct evidence that the market potential for the product or service is large, and the startup can achieve enough market share to meet the sales target?\nIs there some evidence indicating a relatively large market potential and the ability to obtain sufficient market share for the sales target?\nIs there no direct evidence supporting the overall market size or validating the expected market share, making revenue forecasting challenging?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  ",

  Evaluation:
    "Given the provided pitch, Evaluate the Market Size aspect of the startup's product or service and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe presence of direct evidence or indications supporting the overall market potential and expected market share.\nThe feasibility of generating the envisaged revenues based on the overall market size and the startup's market share.\nThe level of interest and attractiveness of the overall market forecast for the product or service.\nAny challenges or uncertainties related to market size estimation and revenue projections.",

  Recommendations:
    'Based on the evaluation of the Market Size aspect, provide recommendations and suggestions on how the startup can enhance their understanding of market size, refine revenue projections, and develop strategies to capture a significant market share. Consider the following aspects:\nBreaking down the market into segments and identifying the specific sector the startup is targeting.\nConducting thorough market research and validation studies to gather accurate data on potential customers, their willingness to pay, and market dynamics.\nIdentifying successful similar businesses or products/services to gain insights and leverage their market size as a reference point.\nDeveloping a focused marketing strategy to attract and capture a reasonable market share.\nSeeking third-party validation and expert opinions to confirm assumptions and enhance confidence in market size estimations.\nProvide specific and actionable recommendations to help the startup demonstrate a solid understanding of the market size, potential customer base, and revenue opportunities, thereby strengthening their overall business strategy.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleEntrepreneurExperience = {
  LetterGrade:
    "Evaluate the Entrepreneur Experience aspect of the startup's management team and assign an appropriate letter from the grade scale considering the following criteria:\nDoes the management team possess deep and significant relevant experience that will enable them to successfully operate the business?\nDoes the management team have significant business or equivalent experience that, although not directly relevant, can contribute to operating the business?\nDoes the experience of the management team primarily lie in technical areas or is it limited, providing no direct evidence of their ability to handle the challenges of running the business?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  ",

  Evaluation:
    "Given the provided pitch, Evaluate the Entrepreneur Experience aspect of the startup's management team and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe depth and relevance of experience possessed by the management team members in areas such as entrepreneurship, industry, and business.\nThe track record and prior successes/failures that demonstrate the management team's ability to navigate challenges.\nAny additional skills, education, or relevant expertise that contribute to their capability to run the business effectively.\nThe potential for the management team to address gaps in their experience by recruiting complementary team members or seeking advisory/mentorship support.",

  Recommendations:
    "Based on the evaluation of the Entrepreneur Experience aspect, provide recommendations and suggestions on how the startup's management team can enhance their experience, skills, and capabilities to successfully overcome the challenges of operating the business. Consider the following aspects:\nIdentifying ways to demonstrate relevant experiences or alternative forms of education that are applicable to the business.\nSeeking out advisors or mentors with the appropriate skills and experience who can guide and support the management team.\nExploring opportunities for team expansion to include individuals with complementary expertise to address any gaps in experience.\nBuilding a network of industry professionals or joining relevant entrepreneurial communities to gain insights and access valuable resources.\nOffer specific and actionable recommendations to help the startup's management team enhance their entrepreneur experience, strengthen their capabilities, and position themselves favorably for investment and effective business management.",

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleFinancialExpectations = {
  LetterGrade:
    'Evaluate the Financial Expectations of the business and assign an appropriate letter from the grade scale based on the following criteria:\nDoes the financial projection demonstrate a high degree of confidence in achieving cash-flow neutrality within a specific timeframe?\nIs there a reasonable degree of confidence in achieving cash-flow neutrality within a specific timeframe, either directly or by raising additional cash?\nDoes the financial projection lack the necessary level of detail or show a negative cash flow position over a specific timeframe, with limited confidence in raising additional cash?\nGrade scale: A+, A, A-, B+, B, B-, C+, C, C-, N/A.  ',

  Evaluation:
    'Given the provided pitch, Evaluate the Financial Expectations of the business and provide a comprehensive evaluation, justifying the assigned letter grade. Consider the following points:\nThe realism and viability of the financial projections in terms of achieving cash-flow neutrality within the specified timeframe.\nThe degree of confidence in revenue forecasts, profit margins, and external funding sources identified to support cash-flow neutrality.\nThe ability of the financial projections to demonstrate a clear path to profitability and long-term viability of the business.\nThe inclusion of cash flow calculations, considering cash from operations, investments, and other potential sources of cash.\nThe consideration of different sources of cash to address potential cash flow shortfalls and reduce reliance on equity financing.\nThe alignment of subsequent rounds of funding with specific milestones and increased company valuation.\nProvide a detailed and well-supported evaluation of the financial projections, highlighting strengths and potential areas of improvement in achieving cash-flow neutrality and long-term financial stability.',

  Recommendations:
    'Based on the evaluation of the Financial Expectations, provide recommendations and suggestions to enhance the financial projections and increase confidence in achieving cash-flow neutrality. Consider the following aspects:\nConducting iterations and sensitivity analysis to refine the financial projections and assess the impact of various scenarios, such as reduced margins, sales delays, or increased development costs.\nIncorporating contingency plans and mitigating strategies to address potential business risks, including technological, market, operational, or financial risks.\nEnsuring that the financial projections focus on significant numbers and avoid unnecessary details that can distract from the key financial indicators.\nConsidering different sources of cash and building contingency plans to address cash flow shortfalls or delays in funding.\nSeeking feedback and guidance from financial advisors or mentors with expertise in financial forecasting and cash flow management.\nProvide specific and actionable recommendations to strengthen the financial projections, improve cash-flow management, and increase the overall financial viability of the business.',

  temperature: 0.2,
  maxTokens: 7000,
};

const exampleEvaluationConfig = {
  name: 'default', // Replace with the desired unique name
  IsInputAPitch:
    'Evaluate this text and determine if the provided text is a startup pitch based on the factors like Introduction and Elevator Pitch, Problem Statement, Solution, Market Opportunity, Business Model, Target Audience and Customer Segments, Competitive Advantage, Financials and Funding.\nIf it is a pitch, return true, otherwise false.',
  FeatureBenefits: exampleFeatureBenefits,
  Readiness: exampleReadiness,
  BarrierToEntry: exampleBarrierToEntry,
  Adoption: exampleAdoption,
  SupplyChain: exampleSupplyChain,
  MarketSize: exampleMarketSize,
  EntrepreneurExperience: exampleEntrepreneurExperience,
  FinancialExpectations: exampleFinancialExpectations,
};
const exampleEmpty = {
  LetterGrade: '',
  Evaluation: '',
  Recommendations: '',
  temperature: 0.2,
  maxTokens: 7000,
};

const exampleEvaluationConfigEmpty = {
  name: '',
  IsInputAPitch:
    'Evaluate this text and determine if the provided text is a startup pitch based on the factors like Introduction and Elevator Pitch, Problem Statement, Solution, Market Opportunity, Business Model, Target Audience and Customer Segments, Competitive Advantage, Financials and Funding.\nIf it is a pitch, return true, otherwise false.',
  FeatureBenefits: exampleEmpty,
  Readiness: exampleEmpty,
  BarrierToEntry: exampleEmpty,
  Adoption: exampleEmpty,
  SupplyChain: exampleEmpty,
  MarketSize: exampleEmpty,
  EntrepreneurExperience: exampleEmpty,
  FinancialExpectations: exampleEmpty,
};

export {
  exampleEvaluationConfig,
  exampleEvaluationConfigEmpty,
  exampleBarrierToEntry,
};
