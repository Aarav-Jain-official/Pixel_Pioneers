import { asyncHandler , apiError , apiResponse , myApi } from "../utils/index.js";
import {Recommendation} from '../models/index.js';
import { model } from "../gemini/gemini.js";

const findResources = asyncHandler(async (req, res) => {
  const { topic, weakAreas } = req.body;

  const prompt = `
    Based on the topic "${topic}" and the user's weak areas in "${weakAreas.join(', ')}",
    please recommend 3 high-quality articles, 3 videos, and 2 online courses.
    Format the response as a JSON object with keys "articles", "videos", and "courses".
    Each key should have an array of objects, with each object containing "title" and "link".
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const resources = JSON.parse(responseText);

    // Here you would save the recommendations to your database
    // and then send them back to the user.

    const recommendation = await Recommendation.create({
      user: req.user._id,
      userInputs: req.body._id,
      category: "",
      recommendations: "",
    });

    return res
      .status(200)
      .json(new apiResponse(200, resources, 'Resources generated successfully'));
  } catch (error) {
    console.error("Error generating resources from Gemini:", error);
    throw new apiError(500, 'Failed to generate resources from AI model.');
  }
});

export { findResources };