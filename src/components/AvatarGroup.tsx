import UserAvatar from "./UserAvatar";

const AvatarGroup = ({ members }: { members: any[] }) => {
  return (
    <div className="avatar-group -space-x-6 ">
      {members.map((member, index) => (
        <div className="avatar">
          <div className="w-10">
            <UserAvatar userName={member.userName} key={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
