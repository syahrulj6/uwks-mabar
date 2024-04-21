const mockImgUrls = [
  "https://utfs.io/f/f04e01d6-927d-42c3-92ec-395a9607b8d9-bow7gj.jpg",
  "https://utfs.io/f/5472abb4-2486-440a-8028-fd38248ab2cd-1tdt.svg",
];

const mockImages = mockImgUrls.map((url, index) => ({
  id: index,
  url,
}));

export default function HomePage() {
  return (
    <main className="bg-main text-main flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-wrap">
        {mockImages.map((image) => (
          <div className="w-1/2 p-4" key={image.id}>
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      <div className="">Hello world</div>
    </main>
  );
}
