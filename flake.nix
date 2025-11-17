{
  description = "Flake for teanin storefront.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    systems.url = "github:nix-systems/default";
  };

  outputs = inputs@{ flake-parts, ...}: flake-parts.lib.mkFlake { inherit inputs; } ({ inputs, ... }: {
    systems = import inputs.systems;
    imports = [ ./nix ];
  });
}
