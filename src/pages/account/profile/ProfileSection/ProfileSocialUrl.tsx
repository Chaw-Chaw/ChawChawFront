import { Dispatch, SetStateAction } from "react";
import { ProfileListItem } from "../../../../components/profile/ProfileListItem";
import { ProfileSocialUrlFragment } from "./ProfileSocialUrlFragment";

interface ProfileSocialUrlProps {
  setFaceBookUrl?: Dispatch<SetStateAction<string>>;
  setInstagramUrl?: Dispatch<SetStateAction<string>>;
  faceBookUrl?: string;
  instagramUrl?: string;
}

const ProfileSocialUrl: React.FC<ProfileSocialUrlProps> = (props) => {
  return (
    <ProfileListItem
      title="Social Network"
      description="당신의 SNS를 공유해주세요."
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <ProfileSocialUrlFragment
          type="facebook"
          setUrl={props.setFaceBookUrl}
          url={props.faceBookUrl}
        />
        <ProfileSocialUrlFragment
          type="instagram"
          setUrl={props.setInstagramUrl}
          url={props.instagramUrl}
        />
      </div>
    </ProfileListItem>
  );
};

export { ProfileSocialUrl };
