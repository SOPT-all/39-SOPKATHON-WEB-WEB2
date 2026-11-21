const POSITION_TIMEOUT_MS = 10_000;

// 내 위치(위도, 경도)를 받아요. 처음이면 브라우저가 위치 권한을 물어봐요.
// 권한을 거부했거나 위치를 못 찾으면 실패해요.
export const getCurrentPosition = () => {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('이 브라우저는 위치를 지원하지 않아요.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({ latitude: coords.latitude, longitude: coords.longitude });
        },
        reject,
        { timeout: POSITION_TIMEOUT_MS },
      );
    },
  );
};
