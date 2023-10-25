import algorithmStepsService from "../services/algorithm-steps.js";
import { validAlgorithms } from "../models/algorithm-steps.js";
import { APIError } from "../exception/APIError.js";

class AlgorithmStepsController {
  getSteps(req, res) {
    const algorithm = req.params.algorithm;

    if (!validAlgorithms.includes(algorithm)) {
      throw APIError.BadRequest("Неправильний алгоритм");
    }

    const page = parseInt(req.query.page) || 1;

    if (page < 1) {
      throw APIError.BadRequest("Сторінка має бути строго додатньою");
    }

    const steps = algorithmStepsService.getSteps(algorithm);
    const limit = 1;
    const totalPages = steps.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    if (startIndex >= totalPages) {
      throw APIError.NotFound("Сторінка не знайдена");
    }

    const limitedSteps = steps.slice(startIndex, endIndex);

    res.json({
      totalPages,
      page,
      data: limitedSteps,
    });
  }
}

export default new AlgorithmStepsController();
