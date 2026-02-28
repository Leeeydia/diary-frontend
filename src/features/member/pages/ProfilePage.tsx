import Header from '../../../shared/components/Header';
import UserCard from '../components/UserCard';
import MyBoardList from '../components/MyBoardList';

function ProfilePage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-8 flex flex-col gap-8">
        <UserCard />
        <MyBoardList />
      </div>
    </>
  );
}

export default ProfilePage;
