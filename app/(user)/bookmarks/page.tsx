import { getBookmarksByUser } from "@/queries/user/bookmarks";
import { getUser } from "@/queries/user/user";
import BookmarksSection from "@/components/user/Sections/BookmarksSection";
import { getUserFromSession } from "@/actions/user/auth";

export default async function BookmarksPage() {
  const user = await getUserFromSession();
  const bookmarks = await getBookmarksByUser();
  return <BookmarksSection userId={user.id} userBookmarks={bookmarks} />;
}
