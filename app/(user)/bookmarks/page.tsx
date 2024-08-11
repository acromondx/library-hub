import { getBookmarksByUser } from "@/queries/user/bookmarks";
import BookmarksSection from "@/components/user/Sections/BookmarksSection";
import { getCurrentUser } from "@/actions/user/auth";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  const bookmarks = await getBookmarksByUser();
  return <BookmarksSection userId={user.id} userBookmarks={bookmarks} />;
}
