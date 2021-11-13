//using System;

namespace Domain
{
    public class Activity
    {

        //Guid as Id has a advantage, that it can be generated on clinet side, so that we dont have
        //to wait for server to create a int Id for client
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

    }
}