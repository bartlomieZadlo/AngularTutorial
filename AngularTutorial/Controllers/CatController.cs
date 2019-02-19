using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularTutorial.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.ComponentModel;


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

        [HttpGet("{name}")]
        public Cat Get(string name)
        {
            return new Cat() { Name = name };
        }

        [HttpPost]
        public Cat Insert([FromBody]Cat cat)
        {
            // write the new cat to database
            return cat;
        }

        [HttpPut("{name}")]
        public Cat Update(string name, [FromBody]Cat cat)
        {
            cat.Name = name;
            // write the updated cat to database
            return cat;
        }

        [HttpDelete("{name}")]
        public void Delete(string name)
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
}

