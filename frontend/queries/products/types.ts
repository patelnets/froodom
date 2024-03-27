import AldiLogo from '../../public/images/stores/aldi.jpg';
import AmazonLogo from '../../public/images/stores/amazon.jpg';
import AsdaLogo from '../../public/images/stores/asda.jpg';
import IcelandLogo from '../../public/images/stores/iceland.jpg';
import MorrisonsLogo from '../../public/images/stores/morrisons.jpg';
import SainsburysLogo from '../../public/images/stores/sainsburys.jpg';
import TescoLogo from '../../public/images/stores/tesco.jpg';
import WaitroseLogo from '../../public/images/stores/waitrose.jpg';
import LidlLogo from '../../public/images/stores/lidl.webp';
import MAndSLogo from '../../public/images/stores/mands.jpg';
import HAndBLogo from '../../public/images/stores/handb.png';

import { StaticImageData } from 'next/image';

export interface Store {
  value: string;
  displayName: string;
  logo: StaticImageData;
}

export type Product = {
  id: string;
  name: string;
  stores: string[];
  image_urls: Record<string, string>;
  header_image: string;
  categories: string[];
};

export const PRIMARY_CATEGORIES: { value: string; displayName: string }[] = [
  { displayName: 'Chinese', value: 'chinese' },
  { displayName: 'Dessert', value: 'dessert' },
  { displayName: 'Drinks', value: 'drinks' },
  { displayName: 'Fake Meat', value: 'fake Meat' },
  { displayName: 'Frozen', value: 'frozen' },
  { displayName: 'Italian', value: 'italian' },
  { displayName: 'Sauces', value: 'sauces' },
  { displayName: 'Seasoning', value: 'seasoning' },
  { displayName: 'Sides', value: 'sides' },
  { displayName: 'Snacks', value: 'snacks' },
  { displayName: 'Soup', value: 'soup' },
  { displayName: 'Sweets', value: 'sweets' },
  { displayName: 'Tinned', value: 'tinned' },
];

export const STORES: Store[] = [
  {
    value: 'aldi',
    displayName: 'Aldi',
    logo: AldiLogo,
  },
  {
    value: 'amazon',
    displayName: 'Amazon',
    logo: AmazonLogo,
  },
  {
    value: 'asda',
    displayName: 'Asda',
    logo: AsdaLogo,
  },
  {
    value: 'hollandAndBarrett',
    displayName: 'Holland & Barrett',
    logo: HAndBLogo,
  },
  {
    value: 'iceland',
    displayName: 'Iceland',
    logo: IcelandLogo,
  },
  {
    value: 'lidl',
    displayName: 'Lidl',
    logo: LidlLogo,
  },
  {
    value: 'mands',
    displayName: 'M&S',
    logo: MAndSLogo,
  },
  {
    value: 'morrisons',
    displayName: 'Morrisons',
    logo: MorrisonsLogo,
  },
  {
    value: 'sainsburys',
    displayName: 'Sainsbury’s',
    logo: SainsburysLogo,
  },
  {
    value: 'tesco',
    displayName: 'Tesco',
    logo: TescoLogo,
  },
  {
    value: 'waitrose',
    displayName: 'Waitrose',
    logo: WaitroseLogo,
  },
];
