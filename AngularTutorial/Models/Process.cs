using System;
using System.Diagnostics;
using System.Threading;

namespace AngularTutorial.Models
{
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
        public string NumberOfThreads { get; set; }
        public string CPUUsage { get; set; }
        public string RunTime { get; set; }
        public string MemoryUsage { get; set; }

        public DetailedProcess(Process process) : base(process)
        {
            try
            {
                StartTime = process.StartTime.ToString("dd/MM/yyyy HH:mm:ss");
                NumberOfThreads = GetNumberOfThreads(process);
                CPUUsage = GetCPUUsage(process);
                RunTime = GetProcessRunTime(process);
                MemoryUsage = (GetProcessMemoryInMb(process)).ToString("0.0") + " MB";
            }
            catch (System.ComponentModel.Win32Exception e)
            {
                Name = e.Message;
                Id = 0;
                StartTime = "";
                CPUUsage = "";
                RunTime = "";
                MemoryUsage = "";
                NumberOfThreads = "";
            }


        }

        private string GetProcessRunTime(Process process)
        {
            TimeSpan processRunTime = DateTime.Now - process.StartTime;
            return string.Format("{0:D3} days {1:D2}:{2:D2}:{3:D2}", processRunTime.Days, processRunTime.Hours, processRunTime.Minutes, processRunTime.Seconds); ;
        }

        private string GetNumberOfThreads(Process process)
        {
            int threadsNumber = process.Threads.Count;
            return threadsNumber.ToString();
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

            return (CPUUsage * 100).ToString("0.00") + " %";
        }
    }
}
