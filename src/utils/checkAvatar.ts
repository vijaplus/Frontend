import img_avatarDefault from "@/assets/images/avatar_user_default.png"

interface par {
  avatar: string | null
}

export function checkAvatar(avatar:par) {
    // return avatar ? pathImage()+avatar : img_avatarDefault
    return  img_avatarDefault
}