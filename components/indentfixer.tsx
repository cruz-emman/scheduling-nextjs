<FormField
  control={form.control}
  name="meetingTypeOption"
  defaultValue={
    dataEvent?.meetingTypeOption as
      | "meeting"
      | "webinar"
      | "hybrid"
      | "documentation"
      | "training"
      | undefined
  }
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Type of Service</FormLabel>
      <Select
        onValueChange={(value) => meetingTypeOnchange(value)}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a meeting type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="meeting">Zoom Meeting</SelectItem>
          <SelectItem value="webinar">Zoom Webinar</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
          <SelectItem value="documentation">Documentation</SelectItem>
          <SelectItem value="training">Training</SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>;
