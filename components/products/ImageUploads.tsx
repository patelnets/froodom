import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postImageUsingPreSignedUrl } from '@/fetch-queries/products/post-image';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import ArrowUpOnSquareIcon from '@heroicons/react/20/solid/ArrowUpOnSquareStackIcon';
import { useRouter } from 'next/navigation';
import { getPreSignedUrl } from '@/fetch-queries/products/get-pre-signed-url';

interface Props {
  productId: string;
}
export const ImageUploads = ({ productId }: Props) => {
  const { data: session } = useSession();

  const { data, refetch } = useQuery({
    queryKey: ['preSignedUrl', productId],
    queryFn: () =>
      // @ts-ignore
      getPreSignedUrl({ id: productId, token: session?.token.id_token }),
  });
  const { mutate: mutateUpload, isPending: isPending } = useMutation({
    mutationFn: postImageUsingPreSignedUrl,
    throwOnError: true,
  });

  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onHandleUpload = () => {
    if (!data) {
      console.log('No data');
      return;
    }

    mutateUpload(
      {
        url: data.url,
        file: files[0],
      },
      {
        onSuccess: () => {
          router.refresh();
          setFiles([]);
          refetch();
        },
      }
    );
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
        ) : files.length > 0 ? (
          <div>
            <ul>
              {files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <ArrowUpOnSquareIcon width={25} />
        )}
      </div>
      <Button
        isLoading={isPending}
        isDisabled={files.length === 0}
        onClick={onHandleUpload}
      >
        Upload images
      </Button>
    </div>
  );
};
