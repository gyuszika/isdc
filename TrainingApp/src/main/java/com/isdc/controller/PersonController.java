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

	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map){
		Person personResult = new Person();
		personService.add(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map){
		Person personResult = new Person();
		personService.edit(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String searchValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map){
		Person personResult = new Person();
		Person searchedPerson = personService.getPerson(person.getPk());
		personResult = searchedPerson!=null? searchedPerson : new Person();
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String deleteValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map){
		Person personResult = new Person();
		personService.delete(person.getPk());
		personResult = new Person();
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String getForm(){
		return "home";
	}
	
	
}
