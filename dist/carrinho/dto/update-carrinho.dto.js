"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarrinhoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carrinho_dto_1 = require("./create-carrinho.dto");
class UpdateCarrinhoDto extends (0, mapped_types_1.PartialType)(create_carrinho_dto_1.CreateCarrinhoDto) {
}
exports.UpdateCarrinhoDto = UpdateCarrinhoDto;
//# sourceMappingURL=update-carrinho.dto.js.map