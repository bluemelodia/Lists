

export class EventUtils {
	public static extractFileURL(fileName: string): string {
		if (!fileName) {
			return '';
		}

		/**
		 * The string is prefixed with C:\fakepath\, to prevent malicious software 
		 * from guessing the user"s file structure.
		 */
		return fileName.substring(fileName.lastIndexOf("\\") + 1);
	}
}