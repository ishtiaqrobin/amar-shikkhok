import { tutorsService } from "@/services/tutors.service";
import React from "react";

const BlogPage = async () => {
  const { data } = await tutorsService.getTutors();

  // console.log("data", data);

  return <div>This is the blog page</div>;
};

export default BlogPage;
