import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '@/fetch-queries/products';
import { postImages } from '@/fetch-queries/products/post-image';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import ArrowUpOnSquareIcon from '@heroicons/react/20/solid/ArrowUpOnSquareStackIcon';

interface Props {
  productId: string;
}
export const ImageUploads = ({ productId }: Props) => {
  const { mutate: mutateUpload, isPending: isPending } = useMutation({
    mutationFn: postImages,
    throwOnError: true,
  });
  const { data: session } = useSession();

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const onHandleUpload = () => {
    const formdata = new FormData();
    for (const file of files) {
      formdata.append('files', file);
    }

    mutateUpload({
      id: productId,
      files: formdata,
      // @ts-ignore
      token: session?.token.id_token,
    });
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <div
        className={
          'flex w-full bg-blue-300 min-h-40 cursor-pointer justify-center items-center rounded-md p-10'
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <ArrowUpOnSquareIcon width={25} />
        )}
      </div>
      <Button onClick={onHandleUpload}>Upload images</Button>
    </div>
  );
};
