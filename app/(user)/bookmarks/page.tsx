import { getBookmarksByUser } from "@/actions/user/bookmarks";
import { getUser } from "@/actions/user/user";
import BookmarksSection from "@/components/user/Sections/BookmarksSection";

export default async function BookmarksPage() {
  const user = await getUser();
  const bookmarks = await getBookmarksByUser({ userId: user });
  return <BookmarksSection userId={user} userBookmarks={bookmarks} />;
}
