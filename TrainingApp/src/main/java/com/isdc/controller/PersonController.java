package com.isdc.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.isdc.model.Person;
import com.isdc.service.PersonService;

@Controller
public class PersonController {

	@Autowired
	private PersonService personService;
	
	@RequestMapping("/person")
	public String setupForm(Map<String, Object> map){
		Person person = new Person();
		map.put("person", person);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/person.do", method = RequestMethod.POST)
	public String doActions(@ModelAttribute Person person, BindingResult result, @RequestParam String action, Map<String, Object> map){
		Person personResult = new Person();
		switch(action.toLowerCase()){
		case "add":
			personService.add(person);
			personResult = person;
			break;
		case "edit":
			personService.edit(person);
			personResult = person;
			break;
		case "delete":
			personService.delete(person.getPk());
			personResult = new Person();
			break;
		case "search":
			Person searchedPerson = personService.getPerson(person.getPk());
			personResult = searchedPerson!=null? searchedPerson : new Person();
			break;
		
		}
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String getForm(){
		return "home";
	}
	
	
}
