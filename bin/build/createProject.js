"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createProject = void 0;
var fs_extra_1 = require("fs-extra");
var kolorist_1 = require("kolorist");
var common_1 = require("./common");
var packageTmpl_1 = __importDefault(require("./template/packageTmpl"));
var execa_1 = __importDefault(require("execa"));
var common_2 = require("./common");
function createProject(args) {
    return __awaiter(this, void 0, void 0, function () {
        var name, result, config, WRITE_FILE_OPTIONS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = args.name;
                    if (!!name) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, common_2.setName)(0 /* InputType.PROJECT */)];
                case 1:
                    result = _a.sent();
                    name = result.name;
                    _a.label = 2;
                case 2:
                    config = (0, common_1.createConfig)({ name: name });
                    (0, fs_extra_1.ensureDirSync)(name);
                    WRITE_FILE_OPTIONS = { encoding: "utf-8" };
                    // 1.创建package.json
                    console.log((0, kolorist_1.blue)("\u521B\u5EFApackage.json"));
                    (0, fs_extra_1.writeFileSync)("".concat((0, common_2.getRootPath)(config), "/package.json"), (0, packageTmpl_1["default"])(), WRITE_FILE_OPTIONS);
                    // 2.创建type-challenges
                    console.log((0, kolorist_1.blue)("\u521B\u5EFA\u9879\u76EE\u6587\u4EF6\u5939\uFF1Atype-challenges"));
                    (0, fs_extra_1.ensureDirSync)("".concat((0, common_2.getRootPath)(config), "/type-challenges"));
                    // 默认创建hello world
                    // await onCreate({ name: "00013", isDefault: true })
                    // 3.安装依赖
                    console.log((0, kolorist_1.blue)("\u5B89\u88C5\u4F9D\u8D56"));
                    console.log((0, common_2.getRootPath)(config));
                    (0, execa_1["default"])("yarn", {
                        cwd: (0, common_2.getRootPath)(config),
                        stdio: [2, 2, 2]
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
