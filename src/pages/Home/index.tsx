import { useNavigate } from "react-router-dom";
import { logout as logoutUser } from "../../api/axios/authAxios";
import { useState } from "react";
import { useGetEmails, useGetProfile } from "../../api/swr/swr";
import { InboxIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const navigate = useNavigate();

  const tabs = [
    { value: "Inbox", icons: <InboxIcon className="h-6 w-6" /> },
    { value: "Sent", icons: <PaperAirplaneIcon className="h-6 w-6" /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const { data: userData, isLoading: loadingUser } = useGetProfile();

  const {
    data: emails,
    error: errorEmails,
    isLoading: loadingEmail,
  } = useGetEmails(activeTab);

  const handleLogout = async () => {
    await logoutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => alert(err.message));
  };

  if (errorEmails) return <div>Error: {errorEmails.message}</div>;

  return (
    <>
      <main className="mx-auto mt-10 flex w-8/12 flex-col rounded-2xl border p-10 outline-black">
        <h1 className="text-center text-3xl font-bold">LNK-MAIL</h1>

        <h4 className="mt-2 text-center text-lg font-semibold">
          <span className="font-light">Selamat Datang, </span>{" "}
          {loadingUser ? `Loading...` : `${userData?.data.name}`}
        </h4>

        <button className="mt-5 self-end me-5 rounded-full border-transparent bg-green-500 p-3 px-10 text-white focus:outline-none">
          Create +
        </button>

        <div className="flex px-2 py-5 sm:px-0">
          <div className="h-inherit flex flex-col justify-between gap-3">
            <div>
              {tabs.map((tab) => (
                <div
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex flex-row items-center justify-between gap-2 rounded-lg px-8 py-2.5 text-lg ring-white/60 ring-offset-2 ring-offset-blue-400 hover:cursor-pointer focus:outline-none focus:ring-2 ${
                    activeTab === tab.value
                      ? "border border-gray-300 bg-white font-bold text-blue-700"
                      : ""
                  }`}
                >
                  {tab.value} {tab.icons}
                </div>
              ))}
            </div>
            <button className="bg-red-500 rounded-full py-1.5 text-white" onClick={handleLogout}>Logout</button>
          </div>
          {loadingEmail && <p>Loading...</p>}
          {emails?.data?.length === 0 ? (
            <p className="mx-auto my-auto self-center">Email kosong</p>
          ) : (
            <ul className="flex flex-col gap-3 mx-5 w-full scroll-auto">
              {emails?.data.map((email) => (
                <li
                  key={email._id}
                  className="relative rounded-lg border border-gray-300 px-5 py-3 hover:cursor-pointer hover:bg-gray-100"
                >
                  <h3 className="text-base font-bold">{email.subject}</h3>

                  <p className="py-1 text-sm">
                    {email.description.length > 100
                      ? email.description.slice(0, 100) + "..."
                      : email.description}
                  </p>

                  <ul className="mt-1 flex justify-between text-sm font-normal text-gray-500">
                    {activeTab === "Sent" && <li>To: {email.recipient}</li>}
                    {activeTab === "Inbox" && <li>From: {email.sender}</li>}
                    <li>
                      {new Date(email.timestamp).toLocaleDateString("id-ID")}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
