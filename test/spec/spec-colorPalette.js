describe("color-palette", function () {
  it('should export the colorPalette module', function () {
    expect(colorPalette).toBeDefined();
  });

  it('should expose a public function', function () {
    expect(colorPalette.getColorGradient).toEqual(jasmine.any(Function));
  });
});
