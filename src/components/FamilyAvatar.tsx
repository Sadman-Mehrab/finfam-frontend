import Avatar from "boring-avatars";
import React from "react";

const FamilyAvatar = ({ familyName }: { familyName: string }) => {
  return (
    <Avatar
      size={100}
      name={familyName}
      variant="bauhaus"
      colors={["#14090d", "#65c3c8", "#eeaf3a", "#ef9fbc", "#ff5861"]}
    />
  );
};

export default FamilyAvatar;
