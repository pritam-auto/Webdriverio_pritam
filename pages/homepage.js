class HomePage
{
    get title()
    {
        return $('//h1[text()="Products & Free Trials"]');
    }
   

    get title()
    {
        return $('//h1[text()="Products & Free Trials"]');
    }

    get subtitle()
    {
        return $('//h2[text()="Customer Service Products"]');
    }

    get subheading()
    {
        return $('//p[text()="AI-powered service and support solutions. Built for the needs of today, ready to scale for tomorrow."]');
    }
  

}
module.exports=new HomePage();