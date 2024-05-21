import Avatar from "boring-avatars";

const UserAvatar = ({ userName }: { userName: string }) => {
  return (
    <Avatar
      size={40}
      name={userName}
      variant="beam"
      colors={["#14090d", "#65c3c8", "#eeaf3a", "#ef9fbc", "#ff5861"]}
    />
  );
};

export default UserAvatar;
