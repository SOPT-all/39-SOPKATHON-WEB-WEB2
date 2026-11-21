// 긴 쪽이 이 크기를 넘으면 줄여요. 휴대폰 사진은 보통 4000px쯤 돼요.
const MAX_IMAGE_SIZE = 1280;
const JPEG_QUALITY = 0.8;

// 사진을 작게 줄인 JPEG 파일로 바꿔요. 서버가 받는 크기(5MB)를 넘지 않게 하려는 거예요.
// 줄이지 못하면 원본을 그대로 돌려줘요.
export const compressImage = async (file: File) => {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement('canvas');

    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas
      .getContext('2d')
      ?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
    });

    if (!blob) return file;

    return new File([blob], 'profile.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
};
