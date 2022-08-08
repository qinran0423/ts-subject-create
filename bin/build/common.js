"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.getRootPath = exports.createConfig = exports.setName = void 0;
var inquirer = __importStar(require("inquirer"));
var path_1 = require("path");
function setName(type) {
    var description = type === 1 /* InputType.QUESTION */
        ? "(必填) 请输入题目名称"
        : "(必填) 请输入项目名称";
    return inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: description
        }
    ]);
}
exports.setName = setName;
function createConfig(answer) {
    var inputConfig = {
        packageName: answer.name
    };
    return inputConfig;
}
exports.createConfig = createConfig;
function getRootPath(args) {
    return (0, path_1.resolve)(process.cwd(), "".concat(args ? args.packageName : ""));
}
exports.getRootPath = getRootPath;
