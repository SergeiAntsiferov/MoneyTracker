export async function catchHandler(error, source) {
  console.log(`Error source - ${source}`);
  console.log(error);
}
