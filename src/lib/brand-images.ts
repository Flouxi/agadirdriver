import agadirDriverLogoAsset from '../assets/logo.png.asset.json';
import heroDesktopAsset from '../assets/hero-desktop-v2.jpg.asset.json';
import travelCoupleAsset from '../assets/travel-couple.jpg.asset.json';
import luxuryVanAsset from '../assets/luxury-van.jpg.asset.json';

export const AGADIR_DRIVER_LOGO_URL = agadirDriverLogoAsset.url;
export const HOMEPAGE_HERO_IMAGE_URL = heroDesktopAsset.url;
export const INFO_SECTION_PRIMARY_IMAGE_URL = travelCoupleAsset.url;
export const INFO_SECTION_SECONDARY_IMAGE_URL = luxuryVanAsset.url;

export const VEHICLE_IMAGE_URLS = {
  standard: 'https://images.transfeero.com/41bf3efc-6a0e-4725-6547-d6f88cd68b00/public',
  first: 'https://images.transfeero.com/e024607e-8976-4f97-6fd5-a63356d5ca00/public',
  suv: 'https://images.transfeero.com/bb43676e-a780-4476-9444-f564b2d9c300/public',
  vanStandard: 'https://images.transfeero.com/62138e03-e05c-4706-72a2-ca292a0b6a00/public',
  vanFirst: 'https://images.transfeero.com/b00d6070-f515-4c6b-a070-9573f492b500/public',
} as const;
