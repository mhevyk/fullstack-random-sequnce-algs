var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AlgorithmStepsService_instances, _AlgorithmStepsService_getFips186Steps;
class AlgorithmStepsService {
    constructor() {
        _AlgorithmStepsService_instances.add(this);
    }
    getSteps(algorithm) {
        switch (algorithm) {
            case "fips186": {
                return __classPrivateFieldGet(this, _AlgorithmStepsService_instances, "m", _AlgorithmStepsService_getFips186Steps).call(this);
            }
        }
    }
}
_AlgorithmStepsService_instances = new WeakSet(), _AlgorithmStepsService_getFips186Steps = function _AlgorithmStepsService_getFips186Steps() {
    return [
        {
            description: "Задамо довільне число 160 \\leq b \\leq 512",
            value: "b = 175",
        },
        {
            description: "Згенеруємо випадкове b-бітове початкове значення s",
            value: "s = 3985giuojvwskeuitjrsklfdwraedf",
        },
        {
            description: "Задамо допоміжне 160-бітове слово t (в шістнадцятковому вигляді)",
            value: "t = 67452301 efcdab89 98badcfe 10325476 c3d2e1f0",
        },
        {
            description: "Почнемо цикл від 1 до m",
        },
        {
            description: "Задамо випадкове b-бітове число y_1",
            value: 1,
        },
        {
            description: "Обчислимо z_i=(s + y_i) mod 2^b",
        },
        {
            description: "Обчислимо G(t, z_i)",
        },
        {
            description: "Розіб'ємо слово на п’ять 32-бітних слів: t= H_0 || H_1 || H_2 || H_3 || H_4",
        },
        {
            description: "Допишемо до слова з правого боку стільки нулів, щоб отримати 512-бітове слово: M=c || 0^{512-b}",
        },
        {
            description: "Розіб'ємо слово U на шістнадцять 32-бітних слів M= M_0 || M_1 ||… || M_{15}",
        },
        {
            description: "Виконати 1 раз крок 4 (основний цикл) алгоритма SHA–1, який змінює H_i (т.е. для N=1)",
        },
        {
            description: "Вихідне слово є конкатенацією: G(t,c)= H_0  || H_1  || H_2  || H_3  || H_4",
        },
        {
            description: "обчислити x_i= G(t, z_i) mod q",
        },
        {
            description: "Закінчимо цикл",
        },
        {
            description: "Як результат виконання попереднього кроку формується псевдовипадкова послідовність x_1, x_2, … , x_n, яку можна використовувати в якості потоку псевдовипадкових бітів",
        },
    ];
};
export default new AlgorithmStepsService();
//# sourceMappingURL=algorithm-steps.js.map