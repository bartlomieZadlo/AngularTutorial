using System.Collections.Generic;
using AngularTutorial.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System;
using System.Threading;

namespace AngularTutorial.Controllers
{
    [Route("api/[controller]")]
    public class CatController : Controller
    {
        [HttpGet]
        public IEnumerable<SimplifiedProcess> GetCats()
        {
            Process[] localAll = Process.GetProcesses();
            SimplifiedProcess[] toReturn = new SimplifiedProcess[localAll.Length];
            int counter = 0;
            foreach (Process process in localAll)
            {
                toReturn[counter] = new SimplifiedProcess(process);
                counter++;
            }
            return toReturn;
        }

        [HttpGet("{id}")]
        public SimplifiedProcess Get(string id)
        {
            Process proccess = Process.GetProcessById(int.Parse(id));
            return new SimplifiedProcess(proccess);
        }

        [HttpPost("{processName}")]
        public void Insert(string processName)
        {
             
            Process.Start(processName);
          
        }


        [HttpDelete("{processName}")]
        public void Delete(string processName)
        {
            // delete the cat from the database

        }

    }

    public class SimplifiedProcess
    {
        public string Name { get; set; }
        public int Id { get; set; }

        public SimplifiedProcess(Process process)
        {
            Name = process.ProcessName;
            Id = process.Id;
        }
    }

    public class DetailedProcess : SimplifiedProcess
    {
        public string StartTime { get; set; }
        public string Threads { get; set; }
        public string ProcessorTime { get; set; }

        public DetailedProcess(Process process) : base(process)
        {
            try
            {
                StartTime = process.StartTime.ToString("dd/MM/yyyy HH:mm:ss");
                Threads = process.Threads.ToString();
                ProcessorTime = GetCPUUsage(process);
                RunTime = (DateTime.Now - process.StartTime).ToString();
                MemoryUsage = (GetProcessMemoryInMb(process)).ToString("0.0") + " MB";
            }
            catch (System.ComponentModel.Win32Exception e)
            {
                Name = e.Message;
                Id = 0;
                StartTime = "";
                ProcessorTime = "";
                RunTime = "";
                MemoryUsage = "";
            }

            
        }

        private double GetProcessMemoryInMb(Process process)
        {
            return process.PrivateMemorySize64 / 1048576.0;
        }

        private string GetCPUUsage(Process process)
        {
            DateTime lastTime = DateTime.Now;
            TimeSpan lastTotalProcessorTime = process.TotalProcessorTime;


            Thread.Sleep(500);

            DateTime curTime = DateTime.Now;
            TimeSpan curTotalProcessorTime = process.TotalProcessorTime;

            double CPUUsage = (curTotalProcessorTime.TotalMilliseconds - lastTotalProcessorTime.TotalMilliseconds) / curTime.Subtract(lastTime).TotalMilliseconds / Convert.ToDouble(Environment.ProcessorCount);

            return (CPUUsage*100).ToString("0.00") + " %";

        }




    }


}

