using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System;
using AngularTutorial.Models;

namespace AngularTutorial.Controllers
{
    [Route("api/[controller]")]
    public class ProcessController : Controller
    {
        [HttpGet]
        public IEnumerable<SimplifiedProcess> GetProc()
        {
            Process[] allLocalProcesses = Process.GetProcesses();
            SimplifiedProcess[] toReturn = new SimplifiedProcess[allLocalProcesses.Length];
            int counter = 0;
            foreach (Process process in allLocalProcesses)
            {
                toReturn[counter] = new SimplifiedProcess(process);
                counter++;
            }
            return toReturn;
        }

        [HttpGet("{id}")]
        public DetailedProcess Get(string id)
        {
            Process proccess = Process.GetProcessById(int.Parse(id));
            return new DetailedProcess(proccess);
        }

        [HttpPost("{processName}")]
        public void StartNewProcess(string processName)
        {
            try
            {
                Process.Start(new ProcessStartInfo("cmd", $"/c start {processName}") { CreateNoWindow = true });
            }
            catch (System.ComponentModel.Win32Exception e)
            {
                Console.WriteLine("ACCESS DENIED" + e.Message);
                Console.ReadLine();
            }
            
        }


        [HttpDelete("{processId}")]
        public void DeleteProcessById(string processId)
        {
            try
            {
                Process.GetProcessById(int.Parse(processId)).Kill();
            }
            catch (System.ComponentModel.Win32Exception e)
            {
                Console.WriteLine("ACCESS DENIED" + e.Message);
                Console.ReadLine();
            }
           
        }

    }
}