import { Button } from './components/lib-ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/lib-ui/alert-dialog';
import { NavBar } from './components/ui/NavBar';
import Transactions from './components/ui/Transactions';
import { useToast } from './components/lib-ui/use-toast';
import { Toaster } from './components/lib-ui/Toaster';

function App() {
  return (
    <>
      <div className='h-screen w-screen '>
        <NavBar />
        <Transactions />
        {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='default'>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
        <Toaster />
      </div>
    </>
  );
}

export default App;
