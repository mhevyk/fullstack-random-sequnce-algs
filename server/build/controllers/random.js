import randomService from "../services/random.js";
import { Random } from "../utils/random.js";
class RandomController {
    getFips186Random(req, res) {
        const count = Number(req.params.limit);
        const limit = Number(req.params.limit);
        const randomNumbers = randomService.getFips186Random({ count, limit });
        res.json({ count, limit, data: randomNumbers });
    }
    getAnsix917Random(req, res) {
        var _a, _b;
        const count = Number(req.params.limit);
        const limit = Number(req.params.limit);
        const seed = ((_a = req.query.seed) === null || _a === void 0 ? void 0 : _a.toString()) || Random.Hex({ bits: 64 });
        const key = ((_b = req.query.key) === null || _b === void 0 ? void 0 : _b.toString()) || Random.Hex({ bits: 192 });
        const randomNumbers = randomService.getAnsix917Random({
            count,
            seed,
            key,
            limit,
        });
        res.json({ count, seed, key, data: randomNumbers });
    }
}
export default new RandomController();
//# sourceMappingURL=random.js.map