"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_1 = require("../js");
it("sukeko", function () {
    // console.log(random(0, 100, 10));
    //console.log(random(0, 100, 10));
    var result = js_1.random(10, 100, 5);
    expect(result % 5).toBe(0);
    expect(result).toBeGreaterThanOrEqual(10);
    expect(result).toBeLessThanOrEqual(100);
});
