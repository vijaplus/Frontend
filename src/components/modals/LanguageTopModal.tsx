import { useRouter } from 'next/router';

export function LanguageTopModal(){
  const router = useRouter();
  const { pathname } = router

  const changeLanguage = (language: string) => {
    router.push(pathname, undefined, { locale: language });
  }

  return(
    <div className="languageTopModal absolute right-0 top-full bg-white shadow-xl z-30 border rounded">
      <div className="p-5 flex flex-col gap-5 w-full "> 
        <p 
          className="w-max flex flex-col justify-center cursor-pointer"
          onClick={() => changeLanguage('en')}
        >EN - English
        </p>
        <p 
          className="w-max flex flex-col justify-center cursor-pointer"
          onClick={() => changeLanguage('vi')}
        >VI - Tiếng Việt
        </p>
        <p 
          className="w-max flex flex-col justify-center cursor-pointer"
          onClick={() => changeLanguage('ja')}
        >JA - 日本語
        </p>
      </div>
    </div>
  )
}