import { Image } from '@nextui-org/react';

interface Props {
  imageUrls: Record<string, string>;
}
export const ProductImages = ({ imageUrls }: Props) => {
  return (
    <div className={'my-2 gap-2 flex flex-col justify-center items-center'}>
      {Object.keys(imageUrls).map((key) => (
        <Image
          isZoomed
          key={key}
          width={240}
          src={imageUrls[key]}
          alt={`product-image-${imageUrls[key]}`}
        />
      ))}
    </div>
  );
};
