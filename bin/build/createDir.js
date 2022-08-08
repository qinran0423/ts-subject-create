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
exports.createDir = void 0;
var axios_1 = __importDefault(require("axios"));
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var createTmpl_1 = require("./createTmpl");
var kolorist_1 = require("kolorist");
var createQuestion_1 = require("./createQuestion");
var common_1 = require("./common");
axios_1["default"].defaults.baseURL = "https://api.github.com";
function createDir(name) {
    return __awaiter(this, void 0, void 0, function () {
        var res, filearr, isFindFileContent, tmplDir, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("/repos/type-challenges/type-challenges/contents/questions")];
                case 1:
                    res = _a.sent();
                    if (res.data) {
                        filearr = res.data;
                        isFindFileContent = filearr.find(function (item) {
                            var names = item.name.split("-");
                            return names[0] === name;
                        });
                        // 如果isFindFileContent,那就去创建文件夹 和内容
                        if (isFindFileContent) {
                            name = isFindFileContent.name;
                            tmplDir = (0, path_1.resolve)("".concat((0, common_1.getRootPath)(), "/type-challenges"), name);
                            (0, fs_extra_1.ensureDirSync)(tmplDir);
                            (0, createTmpl_1.createTmpl)(tmplDir, name, "template");
                            (0, createTmpl_1.createTmpl)(tmplDir, name, "test-cases");
                            console.log((0, kolorist_1.lightBlue)("\u9898\u76EE".concat(name, "\u521B\u5EFA\u6210\u529F")));
                        }
                        else {
                            // 不存在则可能没找到  重新创建
                            aFreshCreate(name);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createDir = createDir;
function aFreshCreate(name) {
    console.log((0, kolorist_1.red)("\u9898\u76EE".concat(name, "\u53EF\u80FD\u6CA1\u6709\u627E\u5230")));
    return (0, createQuestion_1.onCreate)();
}
