package com.isdc.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isdc.model.JsonObject;
import com.isdc.model.Person;
import com.isdc.service.PersonService;

@Controller
public class PersonController {

	@Autowired
	private PersonService personService;

	@RequestMapping("/person")
	public String setupForm(Map<String, Object> map) {
		Person person = new Person();
		map.put("person", person);
		map.put("personList", personService.getAllPerson());
		return "person";
	}
	
	

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		personService.add(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		personService.edit(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}


	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	@ResponseBody
	public void deleteValue(@RequestParam(name = "isin") Long isin) {
		personService.delete(isin);
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String getForm() {
		return "home";
	}

	@RequestMapping(value = "/getPerson", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject getPerson(@RequestParam(name = "isin") Long isin) {
		JsonObject jsonObj = new JsonObject();
		Person searchedPerson = personService.getPerson(isin);

		jsonObj.setIsin(searchedPerson.getIsin());
		jsonObj.setPersonName(searchedPerson.getPersonName());
		jsonObj.setPerformance(searchedPerson.getPersonPerf());

		return jsonObj;
	}
	
	@RequestMapping(value = "/getAllPerson", method = RequestMethod.GET, produces= { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody 
	public List<JsonObject> getAll() {
		@SuppressWarnings("unchecked")
		List<Person> searchedPerson = personService.getAllPerson();
		
		List<JsonObject> jsonObjList = getAllelements(searchedPerson);
		return jsonObjList;
	}

	public List<JsonObject> getAllelements(List<Person> persons) {
		List<JsonObject> allPerson = new ArrayList<JsonObject>();
		
		for(Person person: persons){
			allPerson.add(adaptPerson(person));
		}
		return allPerson;
	} 
	
	private JsonObject adaptPerson(Person person) {
		JsonObject jsonObj = new JsonObject();
		jsonObj.setIsin(person.getIsin());
		jsonObj.setPersonName(person.getPersonName());
	    jsonObj.setPerformance(person.getPersonPerf());
		
		return jsonObj;
	}

}
