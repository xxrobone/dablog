# Row level security for the blog project

POST:
-- Create a policy that allows everyone to select posts
CREATE POLICY select_posts ON posts
  USING (true);
-- Create a policy that allows users to update their own posts
CREATE POLICY update_own_posts ON posts
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
-- Create a policy that allows users to delete their own posts
CREATE POLICY delete_own_posts ON posts
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMENT:
-- Create a policy that allows everyone to select and insert comments
CREATE POLICY select_comments ON comments
  USING (true)
  WITH CHECK (true);
-- Create a policy that allows only the authenticated user who created the post to delete comments
CREATE POLICY delete_own_comments ON comments
  USING (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = comments.post_id
    AND posts.user_id = auth.uid()
  ));
-- Create a policy that disallows updates to comments
CREATE POLICY no_update_comments ON comments
  USING (false);