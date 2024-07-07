import { SearchBar, BackgroundImg, FilterManga } from "@/components";

export default function Home() {
  return (
    <>
      <BackgroundImg classes="bg-bg-img-3 bg-center" type="Manga" />

      <SearchBar type="manga" />

      <FilterManga />
    </>
  );
}
