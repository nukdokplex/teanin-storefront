{ ... }: {
  perSystem = { pkgs, ... }: {
    devShells.default = pkgs.mkShellNoCC {
      name = "teanin-storefront";
      packages = with pkgs; [
        nodejs_20
        pnpm
      ];
    };
  };
}
