describe("color-palette", function () {
  it('should export the colorPalette module', function () {
    expect(colorPalette).toBeDefined();
  });

  it("should expose a public function", function () {
    expect(colorPalette.getColorGradient).toEqual(jasmine.any(Function));
  });

  describe("when calling getColorGradient", function () {
    it("should return an empty array if no arguments supplied", function () {
      var colorGradient = colorPalette.getColorGradient()
      expect(colorGradient).toEqual([]);
    });
    it("should return an empty array if only one argument supplied", function () {
      var colorGradient = colorPalette.getColorGradient(1);
      expect(colorGradient).toEqual([]);
    });
    it("should return an empty array if first argument is not a hex value", function () {
      var colorGradient1 = colorPalette.getColorGradient("asdf", 1);
      var colorGradient2 = colorPalette.getColorGradient("#123erq", 1);
      var colorGradient3 = colorPalette.getColorGradient("123", 1);
      var colorGradient4 = colorPalette.getColorGradient("#asdf", 1);
      expect(colorGradient1).toEqual([]);
      expect(colorGradient2).toEqual([]);
      expect(colorGradient3).toEqual([]);
      expect(colorGradient4).toEqual([]);
    });
    it("should return an empty array if the second argument is not a number between 1 and 5", function () {
      var colorGradient1 = colorPalette.getColorGradient("#fff", 0);
      var colorGradient2 = colorPalette.getColorGradient("#fff", -1);
      var colorGradient3 = colorPalette.getColorGradient("#fff", 6);
      var colorGradient4 = colorPalette.getColorGradient("#fff", "one");
      var colorGradient5 = colorPalette.getColorGradient("#fff", null);
      var colorGradient6 = colorPalette.getColorGradient("#fff", undefined);
      var colorGradient7 = colorPalette.getColorGradient("#fff", NaN);
      expect(colorGradient1).toEqual([]);
      expect(colorGradient2).toEqual([]);
      expect(colorGradient3).toEqual([]);
      expect(colorGradient4).toEqual([]);
      expect(colorGradient5).toEqual([]);
      expect(colorGradient6).toEqual([]);
      expect(colorGradient7).toEqual([]);
    });
    // it("should return an array the size of the length argument if all arguments are valid", function () {
    //   var colorGradient1 = colorPalette.getColorGradient("#fff", 1);
    //   var colorGradient2 = colorPalette.getColorGradient("#fff", 2);
    //   var colorGradient5 = colorPalette.getColorGradient("#fff", 5);
    //   expect(colorGradient1.length).toEqual(1);
    //   expect(colorGradient2.length).toEqual(2);
    //   expect(colorGradient5.length).toEqual(5);
    // });
    it("should return an array of shades of the provided hex value", function () {
      var colorGradient1 = colorPalette.getColorGradient("")
    });
  });
});
