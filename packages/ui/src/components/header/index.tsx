import { NavMenu } from "./nav-menu";

export function Header({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-b-solid border-b-default">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={53}
          height={24}
          viewBox="0 0 122 56"
          aria-labelledby="logo_convertium"
          role="img"
        >
          <title> Convertium logo</title>
          <path
            fill="currentColor"
            d="M103.575,15.056a9.665,9.665,0,0,1,5.288,1.657l1.872,1.4a.909.909,0,0,0,.543.214.817.817,0,0,0,.59-.253l9.394-9.872c-4.4-4.6-11.451-6.645-17.687-6.645-15.335,0-27.6,10.224-27.6,26.071S88.24,53.7,103.575,53.7c6.339,0,13.188-2.045,17.687-6.646l-9.369-9.98a.785.785,0,0,0-1.078-.095l-1.142.907a9.58,9.58,0,0,1-6.1,2.318c-7.259,0-12.268-4.8-12.268-12.574C91.307,20.168,96.01,15.056,103.575,15.056Z"
          ></path>
          <path fill="currentColor" d="M9.049,0A8.988,8.988,0,0,0,0,9.049,9.049,9.049,0,1,0,9.049,0Z"></path>
          <path fill="currentColor" d="M9.049,37.165A8.988,8.988,0,0,0,0,46.214a9.049,9.049,0,1,0,9.049-9.049Z"></path>
          <polygon fill="currentColor" points="40.094 0 19.658 55.262 35.256 55.262 55.691 0 40.094 0"></polygon>
          <polygon fill="currentColor" points="61.934 0 41.498 55.262 57.096 55.262 77.531 0 61.934 0"></polygon>
        </svg>
      </div>
      <NavMenu loggedIn={loggedIn} />
    </header>
  );
}
