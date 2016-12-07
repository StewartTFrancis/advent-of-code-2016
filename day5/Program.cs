using System;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ConsoleTest
{
    class Program
    {
        static Program()
        {}
        static void Main(string[] args)
        {
            string input = "wtnhxymk";
            int step = 100000;
            try
            {
                int iteration = 0;
                while (!PwMinder.Done)
                {
                    Parallel.For(iteration, iteration + step, (i) => {
                        using (MD5 md5 = MD5.Create())
                        {
                            byte[] hashbytes = md5.ComputeHash(Encoding.ASCII.GetBytes(input + i));

                            if(hashbytes[0] == 0 && hashbytes[1] == 0 && hashbytes[2] < 16)
                                PwMinder.FoundHash(hashbytes[2], string.Format("{0:x2}", hashbytes[3]).Substring(0, 1), i);
                        }
                    });
                    iteration += step;

                    Console.SetCursorPosition(0,0);
                    Console.WriteLine(iteration + " : " + PwMinder.Password);
                }

                Console.WriteLine(PwMinder.Password);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            Console.WriteLine("\nDone.\n");
            Console.ReadKey();
        }

        class PwMinder
        {
            static object lockObj = new object();

            static public bool Done {
                get;
                private set;
            }

            static Tuple<int, string>[] hashes = new Tuple<int, string>[8];
            public static void FoundHash(int pos, string val, int i)
            {
                lock(lockObj)
                {
                    if(pos < 8 && (hashes[pos] == null || hashes[pos].Item1 > i))
                    {
                        hashes[pos] = new Tuple<int, string>(i, val);

                        if (hashes.All((entry) => entry != null))
                            Done = true;
                    }
                }
            }
            static public string Password
            {
                get {
                    return string.Join("", hashes.Select((hash) => { return hash?.Item2 ?? "-"; }));
                }
            }
        }
    }
}
