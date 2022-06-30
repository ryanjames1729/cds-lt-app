import { useSession } from 'next-auth/react';
import Image from 'next/image'

import Header from '../components/header';
import Todos from '../components/todos';

export default function IndexPage() {
  const { data } = useSession();

  return (
    <div>
      <Header />

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <div className="flex flex-row justify-center">
        <Image src="/cds_logo.png" alt="logo" width={200} height={200} />
        </div>
        <div className="flex flex-row justify-center"><h1 className="text-3xl font-bold">App Documentation</h1></div>
        <div className="w-full flex flex-col p-2 bg-blue-100 rounded-md">
        <div className="w-full p-2 border-2 border-black rounded shadow-lg bg-white mt-2 mb-1">
            <h2 className="text-2xl font-bold">Sign In To Your Account</h2>
            <p>
                To sign in, simply click the Sign In button at the top right. This app uses Google Single Sign On. 
                Once you click the Sign On, you will be prompted for your Google Account credentials and then you
                will be signed in to the app. There is no need to remember any user names or passwords. 
            </p>
        </div>
        <div className="w-full p-2 border-2 border-black rounded shadow-lg bg-white mt-1 mb-1">
            <h2 className="text-2xl font-bold">Changing Your Settings</h2>
            <p>
                The first time you sign in, your account will be set up with default settings. The default class names
                are 'Class A', 'Class B', 'Class C', and 'Class D'. You can change these class names in the Settings menu.
                Each account is set up with the ability to have learning targets for 1 to 4 classes. If you do not teach 4
                classes, then you can use the keyword 'hide' to hide a class. You can also do this if you wan to temporarily
                hide a class. This does not delete any of the data in your lists.
            </p>
        </div>
        <div className="w-full p-2 border-2 border-black rounded shadow-lg bg-white mt-1 mb-1">
            <h2 className="text-2xl font-bold">Using Learning Targets</h2>
            <p>
                Each class is equipped with a list modeled after a To Do list model. You can add as many items to your list 
                as you want for each class. When you check off an item off the list, you will notice the progress bar at the
                top progresses indicating the class progress through that set of learning targets. If you want to get rid of
                your learning target, then click the X for that learning target. Once you remove or delete a learning target, 
                there is no going back - it is gone.
            </p>
        </div>
        </div>
      </div>
    </div>
  );
}